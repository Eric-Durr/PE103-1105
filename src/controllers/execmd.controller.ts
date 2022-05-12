import { Request, Response } from 'express';
import * as cp from 'child_process';

// JSON RESPONSES CUSTOM TYPES

/**
 * # Custom type for Error JSON object in response
 */
type ErrJSON = {
  errmsg: string,
};

/**
 * # Custom type for success Output JSON object in response
 */
type OutputJSON = {
  command: string,
  output: string
}

// ---------------------------

/**
 * # command run promise method
 * Runs a command capturing the output and errors to launch a JSON as response
 *
 * @param command string of the command param to run
 * @param args string or string array of the arguments form the command
 * @returns Promise<ErrJSON | OutputJSON>
 */

const commandPromise = (
  command: string,
  args: string | string[],
) => new Promise<ErrJSON | OutputJSON>((resolve, reject) => {
  // arguments parsing
  let parsedArgs: string[] = [];
  if (typeof args === 'string') {
    parsedArgs = args.split(' ');
  } else {
    args.forEach((arg) => {
      parsedArgs.push(arg);
    });
  }
  // -----------------
  const child = cp.spawn(command, parsedArgs);

  // promise handling
  child.on('error', (error) => {
    const err: ErrJSON = {
      errmsg: error.message,
    };
    reject(err);
  });
  let fullMsg: string = '';
  child.stderr.on('data', (error) => {
    fullMsg += error.toString();
  });
  child.stdout.on('data', (data) => {
    fullMsg += data.toString();
  });
  child.on('close', (code) => {
    if (code) {
      const err: ErrJSON = {
        errmsg: fullMsg,
      };
      reject(err);
    } else {
      const msg: OutputJSON = {
        command,
        output: fullMsg,
      };
      resolve(msg);
    }
  });
  // --------------
});

export default {
  /**
   * # Run command request callback
   *
   * @param req
   * @param res
   */
  runCommand: (req: Request, res: Response) => {
    // @ts-ignore
    const { command, args } = req.query;
    if (typeof command === 'string' && typeof args === 'string') {
      commandPromise(command, args)
        .then((object) => {
          res.status(200).send(JSON.stringify(object));
        })
        .catch((error) => {
          res.status(400).send(JSON.stringify(error));
        });
    } else {
      res.status(400).send('comand or args are undefinded. Try running the query with /execmd?command=linux command&args=command args');
    }
  },
};

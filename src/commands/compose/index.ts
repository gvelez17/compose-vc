import {Command, Flags} from '@oclif/core' // might have flags later
//import * as vc from '@digitalcredentials/vc' 

const vc = require('@digitalbazaar/vc')

// @ts-ignore
import {securityLoader} from 'documentLoader'

const documentLoader = securityLoader().build()

export default class Compose extends Command {
  static description = 'compose some vcs'

  static examples = [
    `$ oex compose file1.json file2.json`,
  ]

  static args = [{name: 'vc1', description: 'first linked file', required: true},
                 {name: 'vc2', description: 'second linked file', required: false}
                ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Compose)

    // Sample unsigned credential TODO read from the file
    const credential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "https://example.com/credentials/1872",
      "type": ["VerifiableCredential", "AlumniCredential"],
      "issuer": "https://example.edu/issuers/565049",
      "issuanceDate": "2010-01-01T19:23:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "alumniOf": "Example University"
      }
    };


    const signedVC = await vc.issue({credential, suite, documentLoader});
    console.log(JSON.stringify(signedVC, null, 2));

    this.log(`compose ${args.vc1} ${args.vc2}! (./src/commands/compose/index.ts)`)
  }
}

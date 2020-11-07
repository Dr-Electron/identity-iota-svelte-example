<script>
  // Without web.js wrapper
  // 	  import initWasm, * as wasm from "iota-identity-wasm-test/web/iota_identity_wasm";
  //   let __initializedIotaWasm = false;

  //   function __getLib() {
  //     if (__initializedIotaWasm) {
  //       return Promise.resolve(wasm);
  //     }
  //     return initWasm("iota_identity_wasm_bg.wasm").then(() => {
  //       __initializedIotaWasm = true;
  //       return wasm;
  //     });
  //   }

  //   __getLib().then(lib => console.log(new lib.Key()));
  // With web.js wrapper
  import * as lib from "iota-identity-wasm-test/web";
  let keyPair, did;
  // functions mapped
  (async () => {
    keyPair = await lib.newKey();
    did = await lib.newDID(keyPair.public);
  })();

  // functions not mapped, but everything available
  (async () => {
    let id = await lib.default();
    keyPair = new id.Key();
    did = new id.DID(keyPair.public);
    console.log(id.Doc.generateCom());
  })();
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Identity</h1>

  <div>Keypair: {keyPair}</div>
  <div>DID: {did}</div>

</main>

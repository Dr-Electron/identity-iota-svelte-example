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
  lib.newKey().then(_keyPair => {
    keyPair = JSON.stringify(_keyPair);
    lib.newDID(_keyPair.public).then(r => (did = JSON.stringify(r)));
  });
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

<script>
  import identity_lib from "iota-identity-wasm-test/web";

  let did = "";
  let resolveDID = "";

  let promise = example();
  async function example() {
    let lib = await identity_lib();
    // let keyPair = new lib.Key();
    // let did = new lib.DID(keyPair.secret);
    // console.log(new lib.Doc({ did: did.did, key: keyPair.public }).document);
    // above in a single function
    let { key, doc } = lib.Doc.generateCom();
    doc.sign(key);
    console.log(key.secret);
    console.log(key.public);
    console.log(doc.document);
    console.log(lib.Key.from_strings(key.secret, key.public));
    let tx = await lib.publish(doc.document, {
      node: "https://nodes.comnet.thetangle.org:443",
      network: "com"
    });
    did = doc.document.id;
    return { keypair: key, doc: doc.document, tx };
  }

  async function resolve_did() {
    let lib = await identity_lib();
    let doc = await lib.resolve(did, {
      node: "https://nodes.comnet.thetangle.org:443",
      network: "com"
    });
    return doc;
  }

  function handleClick() {
    resolveDID = resolve_did();
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }
  input {
    width: 35em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Identity</h1>
  {#await promise}
    <p>Generating keypair, document and publish it to the Tangle</p>
  {:then res}
    <p>Private key: {res.keypair.secret}</p>
    <p>Public key: {res.keypair.public}</p>
    <p>DID Document: {JSON.stringify(res.doc, 'br\n', 3)}</p>
    <p>
      Tx :
      <a
        href="https://comnet.thetangle.org/transaction/{res.tx}"
        target="_blank">
        {res.tx}
      </a>
    </p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

  <input bind:value={did} placeholder="Enter a DID" />
  <button on:click={handleClick}>Resolve DID</button>
  {#await resolveDID}
    <p>Resolving...</p>
  {:then resolved_doc}
    <p>Resolved document: {JSON.stringify(resolved_doc, null, 1)}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

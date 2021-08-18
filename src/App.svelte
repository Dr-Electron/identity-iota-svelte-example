<script>
  import * as lib from "test-iota-client-wasm/web/";

  let index = "";
  let node = "https://chrysalis-nodes.iota.org/";
  let res;
  let messages = [];

  async function get_messages() {
    await lib.init();
    let iota_client = await new lib.ClientBuilder().node(node).build();
    // Get the nodeinfo
    console.log(await iota_client.getInfo());
    // let message = await iota_client.message().index("test").submit();
    // console.log(message);
    let messageIds = await iota_client
      .getMessage()
      .index(new TextEncoder().encode(index));
    console.log(messageIds);
    console.log(messageIds.length);
    // clear messages
    messages = [];
    for (let i = 0; i < messageIds.length; i++) {
      console.log(messageIds[i]);
      messages.push(await iota_client.getMessage().data(messageIds[i]));
    }
    console.log(messages);
    return messages;
  }

  function handleClick() {
    res = get_messages();
  }
</script>

<main>
  <h1>IOTA client</h1>

  <input bind:value={index} placeholder="Enter an index" />
  <br />
  <input bind:value={node} placeholder="IOTA node url" />
  <button on:click={handleClick}>Get messages</button>
  {#await res}
    <p>Get messages...</p>
  {:then messages_res}
    <p>Messages: {JSON.stringify(messages_res, null, 1)}</p>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</main>

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

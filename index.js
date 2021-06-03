const { Client } = require('@elastic/elasticsearch')

module.exports.handler = async (event, context) => {
  try {
    const { body } = event.Records ? JSON.parse(event.Records[0]) : event;
    const index = process.env.ELASTIC_INDEX;
    const client = new Client({
      node: process.env.ELASTIC_URL,
      auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD
      }
    })

    await client.index({ index, refresh: true, body });

    return context.succeed({ statusCode: 200, body: 'Success!', });

    /* const result = await client.search({
      index,
      body: {
        query: {
          match_all: {}
        }
      }
    }); */


    /* return context.succeed({
      statusCode: 200,
      body: JSON.stringify(result.body.hits),
    }); */
  } catch (err) {
    context.fail(err)
  }
};

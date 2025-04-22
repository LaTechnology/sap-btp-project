const cds = require('@sap/cds')
const SapCfAxios = require("sap-cf-axios").default;

module.exports = class MyService extends cds.ApplicationService {
  init() {

    const BpaCapmIntegration = SapCfAxios("BpaCapmIntegration");


    this.on('pushData', async (req, res) => {
      console.log('On pushData', req.data)
      const { reason, from, _to } = req.data;

      let payload = {
        definitionId: "us10.f08f0815trial.capintegration.leaveapply",
        context: {
          reason,
          from,
          _to
        }
      };
      console.log('payload', payload)

      try {
        const oResult = await BpaCapmIntegration.post('/v1/workflow-instances', payload);
        console.log("triggered the process payload", oResult)
        // if (response.status !== 201) {
        //   throw new Error('Failed to trigger the process.');
        // }

        return `Triggered the process with reason: "${reason}", from: "${from}", to: "${_to}"`;

      } catch (error) {
        console.error('Error triggering process:', error.message);
        req.reject(500, 'Failed to trigger the process');
      }
    });
    return super.init()
  }
}
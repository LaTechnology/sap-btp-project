package customer.demo1.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import com.sap.cds.ql.Insert;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.demo1.db.Countries;
import cds.gen.demo1.db.Countries_;
import cds.gen.demo1.srv.countryapi.CountryAPIJava_;
import cds.gen.demo1.srv.countryapi.CountryAPI_;

@Controller
@ServiceName(CountryAPI_.CDS_NAME)
public class CountriesHandler implements EventHandler {

    @Autowired
    private PersistenceService db;

    private static class CountryData {
        public String country;
        public String iso3;
    }

    public static class ApiResponse {
        public List<CountryData> data;
    }

    // @Before(event = CqnService.EVENT_CREATE, entity = CountryAPIJava_.CDS_NAME)
    @On(event = CqnService.EVENT_CREATE, entity = Countries_.CDS_NAME)
    public void getCountry() {

        System.out.println("Handler triggered");

        String countryURL = "https://countriesnow.space/api/v0.1/countries";

        System.out.println(countryURL);

        RestTemplate restTemplate = new RestTemplate();

        ApiResponse apires = restTemplate.getForObject(countryURL, ApiResponse.class);

        System.out.println(apires);

        if (apires != null && apires.data != null) {

            for (CountryData countryData : apires.data) {

               

                Map<String, Object> dataMap = new HashMap<>();
                dataMap.put("id", generateUniqueId());
                dataMap.put("countryName", countryData.country);
                dataMap.put("countryCode", countryData.iso3);

                CqnInsert insert = Insert.into(CountryAPIJava_.class).entry(dataMap);
                db.run(insert);

               

            }

        }

        else {
            System.out.println("API response is null or data is empty");
        }

    }

    // @GetMapping(path = "/odata/v4/demo1.srv.CountryAPI/CountryAPI_Java")
    // public String manualTrigger() {
    //     getCountry();
    //     return "Handler manually triggered";
    // }

    private String generateUniqueId() {
        // Random random = new Random();
        // return random.nextLong();
        return UUID.randomUUID().toString();
    }

}
    const axios = require('axios');
    const cds = require('@sap/cds');
    const { v4: uuidv4 } = require('uuid'); 

    module.exports = cds.service.impl(async function () {
        const { Country } = this.entities; // Assuming 'Country' is the correct entity name

        this.on('READ', Country, async (req) => {
            try {
                // Fetch countries data from the API
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
                const countriesData = response.data.data;

                // Extract country names and ISO codes
                const countries = countriesData.map(country => ({
                    id: uuidv4(),
                    countryName: country.country,
                    countryCode: country.iso3
                }));

                // Insert countries data into the database
                await Promise.all(countries.map(async countryData => {
                    
                    await this.run(UPSERT.into('Country').entries(countryData));
                    
                }));
            // }
                

                console.log('Extracted Country Data:', countries);
                return countries;
            } catch (error) {
                console.error('Error fetching countries data:', error);
                throw error;
            }
        });
    });


  
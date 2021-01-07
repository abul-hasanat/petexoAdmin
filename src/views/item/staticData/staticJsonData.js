//import React from 'react';

// const staticJsonData = () => {

    const originData = [
        {
            originID: 1,
            origin: "Self Produced",
        },
        {
            originID: 2,
            origin: "Domestically Produced",
        },
        {
            originID: 3,
            origin: "Wild Caught",
        },
        {
            originID: 4,
            origin: "Imported",
        },
    ];
    
    const sexData = [
        {
            sexID: 1,
            sex: "?",
        },
        {
            sexID: 2,
            sex: "Male",
        },
        {
            sexID: 3,
            sex: "Female",
        },
    ];
    
    const maturityData = [
        {
            maturityID: 1,
            maturity: "Baby",
        },
        {
            maturityID: 2,
            maturity: "SubAdult",
        },
        {
            maturityID: 3,
            maturity: "Adult",
        },
    ];
    
    const breederData = [
        {
            breederID: 1,
            breeder: "proven breeder",
        },
        {
            breederID: 2,
            breeder: "Yes",
        },
        {
            breederID: 3,
            breeder: "No",
        },
    ];
    
    const currencyData = [
        {
            currencyID: 1,
            currency: "Euro",
        },
        {
            currencyID: 2,
            currency: "USD",
        },
        {
            currencyID: 3,
            currency: "GBP",
        },
    ];
    
    const dietData = [
        {
            dietID: 1,
            diet: "?",
        },
        {
            dietID: 2,
            diet: "Live",
        },
        {
            dietID: 3,
            diet: "Frozen",
        },
        {
            dietID: 4,
            diet: "Pre-Killed",
        },
    ];
    
    const dietTypeData = [
        {
            dietTypeID: 1,
            dietType: "?",
        },
        {
            dietTypeID: 2,
            dietType: "Rat",
        },
        {
            dietTypeID: 3,
            dietType: "Mouse",
        },
        {
            dietTypeID: 4,
            dietType: "Vegetables",
        },
        {
            dietTypeID: 5,
            dietType: "Rabbit",
        },
        {
            dietTypeID: 6,
            dietType: "Others",
        },
    ];
    
    const availablityData = [
        {
            availablityID: 1,
            availablity: "Available",
        },
        {
            availablityID: 2,
            availablity: "Soled Elsewhere",
        },
        {
            availablityID: 3,
            availablity: "Hidden/Expired",
        },
        {
            availablityID: 4,
            availablity: "Deleted",
        },
    ];
    
    export default originData;
    export {
        sexData,
        maturityData,
        breederData,
        currencyData,
        dietTypeData,
        dietData,
        availablityData,
    };
    
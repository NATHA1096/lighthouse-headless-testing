'use strict';

const Audit = require('lighthouse').Audit;

const MAX_API_TIME = 3000;

class LoadAudit extends Audit {
    static get meta() {
        return {
            id: 'api-audit',
            title: 'API Ratp pwa metrics',
            category: 'MyPerformance',
            name: 'api-audit',
            description: 'Schedule API initialized and ready',
            failureDescription: 'Schedule API slow to initialize',
            helpText: 'Used to measure time from navigationStart to when the schedule' +
            ' card is shown.',

            requiredArtifacts: ['TimeToApi']
        };
    }

    static audit(artifacts) {
        const loadedTime = artifacts.TimeToApi;

        const belowThreshold = loadedTime <= MAX_API_TIME;

        return {            
            rawValue: loadedTime,
            score: Number(belowThreshold),
            displayValue: loadedTime
        };
    }
}

module.exports = LoadAudit;
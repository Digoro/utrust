import * as AWS from 'aws-sdk';

import { Applicant } from '../models/applicant';
import { ApplicantUsecase } from '../domain/applicant';

export class ApplicantRepository implements ApplicantUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async signUp(mail: string, name: string, password: string) {
        const applicant = new Applicant(name, mail, password);
        await this.dbClient.put(applicant.putQuery).promise();
        return applicant as Applicant;
    }

    async getApplicant(name: string) {
        const applicant = await this.dbClient.get(new Applicant(name).keyQuery).promise();
        if (!applicant) throw new Error(`not linked name : ${name}`);
        return (applicant.Item as Applicant);
    }

    // TODO: 리스크 조회 수정
    async getApplicants() {
        var params = {
            TableName: "applicant"
        };
        const applicants = await this.dbClient.scan(params).promise();
        if (!applicants) throw new Error(`no exist applicants`);
        return (applicants.Items as Applicant[]);
    }

    // TODO: 수정
    async setSponser(name: string, sponser: string) {
        const applicant = await this.dbClient.get(new Applicant(name).keyQuery).promise();
        if (!applicant) throw new Error(`not linked name : ${name}`);
        else {
            const a = applicant.Item as Applicant;
            a.setSponser(sponser);
            var params = {
                TableName: 'applicant',
                Key: {
                    name: name
                },
                UpdateExpression: "set applicant.sponser = :s",
                ExpressionAttributeValues: {
                    ":s": a.sponsers
                },
                ReturnValues: "UPDATED_NEW"
            };
            await this.dbClient.update(params).promise();
            return a
        }
    }

    async setStatus(applicant: string, sponser: string, status: string) {
        const app = await this.dbClient.get(new Applicant(applicant).keyQuery).promise();
        if (!app) throw new Error(`not linked name : ${applicant}`);
        else {
            const a = app.Item as Applicant;
            a.setStatus(sponser, status);
            var params = {
                TableName: 'applicant',
                Key: {
                    name: 'name'
                },
                UpdateExpression: "set applicant.statuses = :s",
                ExpressionAttributeValues: {
                    ":s": a.statuses
                },
                ReturnValues: "UPDATED_NEW"
            };
            await this.dbClient.update(params).promise();
        }
    }
}
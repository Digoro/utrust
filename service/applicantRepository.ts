import * as AWS from 'aws-sdk';

import { Applicant } from '../models/applicant';
import { ApplicantUsecase } from '../domain/applicant';

export class ApplicantRepository implements ApplicantUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async getApplicant(id: string) {
        const applicant = await this.dbClient.get(new Applicant(id).keyQuery).promise();
        if (!applicant) throw new Error(`not linked id : ${id}`);
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
}
import * as AWS from 'aws-sdk';
import { SponserUsecase } from '../domain/sponser';
import { Sponser } from '../models/sponser';

export class SponserRepository implements SponserUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async getSponser(id: string) {
        const sponser = await this.dbClient.get(new Sponser(id).keyQuery).promise();
        if (!sponser) throw new Error(`not linked id : ${id}`);
        return (sponser.Item as Sponser);
    }

    async getSponsers() {
        var params = {
            TableName: "sponser"
        };
        const sponsers = await this.dbClient.scan(params).promise();
        if (!sponsers) throw new Error(`no exist sponsers`);
        return (sponsers.Items as Sponser[]);
    }
}
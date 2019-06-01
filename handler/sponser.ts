import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response, createDBClient } from '../models';
import { SponserRepository } from '../service/sponserRepository';

const sponserRepo = new SponserRepository(createDBClient());

export const getSponser: APIGatewayProxyHandler = middleware(
  async (param) => {
    const id = param.queryParams.id;
    try {
      const sponser = await sponserRepo.getSponser(id);
      return response(200, { sponser: sponser });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { queryParams: ['id'] }
)

export const getSponsers: APIGatewayProxyHandler = middleware(
  async () => {
    try {
      const sponsers = await sponserRepo.getSponsers();
      return response(200, { sponsers: sponsers });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  {}
)
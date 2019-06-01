import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { ApplicantRepository } from '../service/applicantRepository';
import { response, createDBClient } from '../models';

const applicantRepo = new ApplicantRepository(createDBClient());

export const getApplicant: APIGatewayProxyHandler = middleware(
  async (param) => {
    const id = param.queryParams.id;
    try {
      const applicant = await applicantRepo.getApplicant(id);
      return response(200, { applicant: applicant });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { queryParams: ['id'] }
)

export const getApplicants: APIGatewayProxyHandler = middleware(
  async () => {
    try {
      const applicants = await applicantRepo.getApplicants();
      return response(200, { applicants: applicants });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  {}
)
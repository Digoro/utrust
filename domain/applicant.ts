import { Applicant } from "../models/applicant";

export interface ApplicantUsecase {
    getApplicant: (id: string) => Promise<Applicant>
    getApplicants: () => Promise<Applicant[]>
}
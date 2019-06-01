import { Sponser } from "../models/sponser";

export interface SponserUsecase {
    getSponser: (id: string) => Promise<Sponser>
    getSponsers: () => Promise<Sponser[]>
}
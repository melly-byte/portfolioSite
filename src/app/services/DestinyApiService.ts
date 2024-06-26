import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";
import { Injectable } from "@angular/core";
import { get } from "aws-amplify/api";

//api root: https://www.bungie.net/Platform

interface invItems {
    Response: {
        equipment: {
            data: {
                items: item[]
            }
        },
        loadouts: {}
    }
}
interface item {
    itemHash: number,
    itemInstanceId: string,
}
@Injectable({
  providedIn: 'root'
})

export class DestinyApiService {

    constructor(private http: HttpClient) {}

    getCharacterInventory(characterId: string) {
        const apiKey = environment.BUNGIE_API_KEY;
        const membershipId = environment.DEST_MEMBER_ID;

        const path = `https://www.bungie.net/Platform/Destiny2/3/Profile/${membershipId}/Character/${characterId}/?components=205`;

        try {
            const getOp = this.http.get<invItems>(
                path,
                {headers: { 'X-API-Key': apiKey }},
            )
            return getOp;
        } catch (error) {
            console.error('Error fetching character inventory: ', error);
            return null;
        }
    }
}
/* tslint:disable */
/* eslint-disable */
/**
 * Spotifete Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IsSessionAuthenticatedResponse,
    IsSessionAuthenticatedResponseFromJSON,
    IsSessionAuthenticatedResponseToJSON,
    NewAuthenticationSessionResponse,
    NewAuthenticationSessionResponseFromJSON,
    NewAuthenticationSessionResponseToJSON,
} from '../models';

export interface InvalidateAuthenticationSessionRequest {
    sessionId: string;
}

export interface IsSessionAuthenticatedRequest {
    sessionId: string;
}

/**
 * 
 */
export class AuthenticationApi extends runtime.BaseAPI {

    /**
     */
    async invalidateAuthenticationSessionRaw(requestParameters: InvalidateAuthenticationSessionRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling invalidateAuthenticationSession.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/auth/session/id/{sessionId}/invalidate`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async invalidateAuthenticationSession(requestParameters: InvalidateAuthenticationSessionRequest, initOverrides?: RequestInit): Promise<void> {
        await this.invalidateAuthenticationSessionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async isSessionAuthenticatedRaw(requestParameters: IsSessionAuthenticatedRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<IsSessionAuthenticatedResponse>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling isSessionAuthenticated.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/auth/session/id/{sessionId}/is-authenticated`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => IsSessionAuthenticatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async isSessionAuthenticated(requestParameters: IsSessionAuthenticatedRequest, initOverrides?: RequestInit): Promise<IsSessionAuthenticatedResponse> {
        const response = await this.isSessionAuthenticatedRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async newAuthenticationSessionRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<NewAuthenticationSessionResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/auth/session/new`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NewAuthenticationSessionResponseFromJSON(jsonValue));
    }

    /**
     */
    async newAuthenticationSession(initOverrides?: RequestInit): Promise<NewAuthenticationSessionResponse> {
        const response = await this.newAuthenticationSessionRaw(initOverrides);
        return await response.value();
    }

}
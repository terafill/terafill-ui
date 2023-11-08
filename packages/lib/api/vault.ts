import { BASE_URL } from "config/config";

import { httpCall } from "./httpCallFacade";

export async function getVaults() {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults`,
		"get"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function getVaultItems(vaultId: string) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}/items`,
		"get"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function getTagItems(tagId: string) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/tags/${tagId}/items`,
		"get"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

interface Vault {
	vaultId?: string;
	name?: string;
	description?: string;
}

export async function updateVault({ vaultId, name, description }: Vault) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}`,
		"put",
		{},
		{
			name: name,
			description: description,
		}
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function addVault({ name, description }: Vault) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults`,
		"post",
		{},
		{
			name: name,
			description: description,
		}
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function deleteVault({ vaultId }: Vault) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}`,
		"delete"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

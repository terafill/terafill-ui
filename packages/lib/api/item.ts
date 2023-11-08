import { BASE_URL } from "config/config";

import { getKeyWrappingKeyPair, encryptData } from "../utils/security";

import { httpCall } from "./httpCallFacade";

interface customItemFieldParams {
	fieldValue: string;
	fieldName: string;
	id: string;
	isTag: string;
}

interface VaultItemParams {
	vaultId: string;
	id?: string;
	iek?: string;
	title?: string;
	website?: string;
	password?: string;
	username?: string;
	isFavorite?: boolean;
	tags?: Array<string>;
	customItemFields?: Array<customItemFieldParams>;
}

export async function getVaultItem({ vaultId, id }: VaultItemParams) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`,
		"get"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

const encryptItemData = ({
	title,
	iek,
	website,
	password,
	username,
	tags,
	customItemFields,
}) => {
	const keyWrappingKeyPair = getKeyWrappingKeyPair();
	const iekEnc = keyWrappingKeyPair.public.encrypt(iek);
	return {
		title: encryptData(title, iek),
		website: encryptData(website, iek),
		password: encryptData(password, iek),
		username: encryptData(username, iek),
		encryptedEncryptionKey: iekEnc,
		type: "PASSWORD",
		tags: tags ? tags : [],
		customItemFields: customItemFields
			? customItemFields.map((fieldData) => {
					if (fieldData.isTag) return fieldData;
					return {
						...fieldData,
						fieldName: encryptData(fieldData.fieldName, iek),
						fieldValue: encryptData(fieldData.fieldValue, iek),
					};
			  })
			: [],
	};
};

export async function updateVaultItem({
	vaultId,
	id,
	itemData,
}: VaultItemParams) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`,
		"put",
		{},
		encryptItemData(itemData)
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function createVaultItem({ vaultId, itemData }) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}/items`,
		"post",
		{},
		encryptItemData(itemData)
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function deleteVaultItem({ vaultId, id }: VaultItemParams) {
	const httpCallResponse = await httpCall(
		`${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`,
		"delete"
	);
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

export async function getTagList() {
	const httpCallResponse = await httpCall(`${BASE_URL}/users/me/tags`, "get");
	if (httpCallResponse?.error) {
		return httpCallResponse;
	}
	return httpCallResponse?.data;
}

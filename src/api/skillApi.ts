import { apiClient } from "./apiClient";
import { SkillDto, SkillPageResponse } from "@/types/skill/skillTypes";

export async function fetchAllSkillsApi(): Promise<SkillDto[]> {
    try {
        // Traz 100 skills ativas para popular a lista
        const response = await apiClient.get<SkillPageResponse>("/skills?page=0&size=100&deleted=0");
        return response.data.content;
    } catch (error) {
        console.error("Erro ao buscar skills:", error);
        return [];
    }
}

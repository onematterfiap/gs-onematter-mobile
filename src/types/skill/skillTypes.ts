export interface SkillDto {
    id: number;
    nome: string;
    categoria: string;
}

export interface SkillPageResponse {
    content: SkillDto[];
    totalPages: number;
    totalElements: number;
}

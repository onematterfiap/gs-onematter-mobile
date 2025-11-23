import { fetchVagasApi, fetchMinhasCandidaturasApi, cancelarCandidaturaApi, fetchVagaByIdApi } from "@/api/applicationApi";
import { Application, ApplicationResponseDto, jobResponseDto, PageResponse, VagaDetalheDto, VagaSkillDetalheDto } from "@/types/job/jobTypes";

/**
 * Modelo de dados formatado para a UI de Vagas.
 */
export interface VagaFrontend {
    id: number;
    descricao: string;
    nomeEmpresa: string;
    nomeRecrutador: string;
    dataCriacaoFormatada: string;
}

const mapVagaToFrontend = (vaga: jobResponseDto | VagaDetalheDto): VagaFrontend => {
    return {
        id: vaga.id,
        descricao: vaga.descricao,
        nomeEmpresa: vaga.nomeEmpresa,
        nomeRecrutador: vaga.nomeRecrutador,
        // Formatação da data de criação para o padrão brasileiro
        dataCriacaoFormatada: new Date(vaga.dataCriacao).toLocaleDateString("pt-BR"),
    };
};

/**
 * Busca vagas ativas e aplica a lógica/formatação de front-end.
 */
export async function fetchVagasService(page: number = 0, size: number = 10): Promise<PageResponse<VagaFrontend>> {
    const data = await fetchVagasApi(page, size);

    const contentMapeado = data.content.map(mapVagaToFrontend);

    return {
        ...data,
        content: contentMapeado,
    };
}

/**
 * Busca o número total de vagas ativas
 */
export async function fetchTotalVagasAtivasService(): Promise<number> {
    // Busca apenas 1 elemento (size=1) para minimizar o payload,
    // mas obtém a contagem total de vagas ativas no campo totalElements.
    const data = await fetchVagasApi(0, 1);
    return data.totalElements;
}

const mapCandidaturaToFrontend = (candidatura: ApplicationResponseDto): Application => {
    return {
        id: candidatura.idCandidatura,
        idVaga: candidatura.idVaga,
        descVaga: candidatura.descVaga,
        nomeEmpresa: candidatura.nomeEmpresa,
        // Formatação da data da candidatura para o padrão brasileiro
        dataCandidaturaFormatada: new Date(candidatura.dataCandidatura).toLocaleDateString("pt-BR"),
    };
};

/**
 * Lista as candidaturas do usuário logado com formatação para o front-end.
 */
export async function fetchMinhasCandidaturasService(page: number = 0, size: number = 10): Promise<PageResponse<Application>> {
    const data = await fetchMinhasCandidaturasApi(page, size);

    const contentMapeado = data.content.map(mapCandidaturaToFrontend);

    return {
        ...data,
        content: contentMapeado,
    };
}

/**
 * Envia a requisição para cancelar a candidatura (wrapper do API).
 */
export async function cancelarCandidaturaService(idCandidatura: number): Promise<void> {
    await cancelarCandidaturaApi(idCandidatura);
}

// Novo modelo de dados para a tela de detalhes
export interface VagaDetalhesFrontend extends VagaFrontend {
    idRecrutador: number;
    skills: VagaSkillDetalheDto[];
}

const mapVagaDetalheToFrontend = (vaga: VagaDetalheDto): VagaDetalhesFrontend => {
    // Reusa o mapeamento base da listagem
    const base = mapVagaToFrontend(vaga);

    return {
        ...base,
        idRecrutador: vaga.idRecrutador,
        skills: vaga.skillsRequeridas, // Mapeia o campo de skills
    };
};

/**
 * Busca detalhes de uma vaga por ID e aplica a formatação de front-end.
 */
export async function fetchVagaDetalhesService(id: number): Promise<VagaDetalhesFrontend> {
    const data = await fetchVagaByIdApi(id);
    return mapVagaDetalheToFrontend(data);
}

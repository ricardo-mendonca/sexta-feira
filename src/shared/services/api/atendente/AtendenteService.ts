import moment from 'moment';
import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemAtendente{
    id: number;
    nome: string;
    apelido: string;
    email: string;
    telefone: string;
    proprietario: string;
    gerente: string;
    profissional: string;
    nascimento: Date;
    cpf: string;
    rg: string;
    orgaoExpedidor: string;
    informacaoAdicionais: string;
    ChavePix: string;
    bancoId: number;
    agencia: string;
    conta: string;
    tipoConta: string;
    tipoPessoa: string;
    nomeConta: string;
    cpfConta: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    ativo: string;
    usuarioGrupo: string;
    usuarioId: string;
}

export interface IDetalheCliente{
    id: number;
    nome: string;
    apelido: string;
    email: string;
    telefone: string;
    proprietario: string;
    gerente: string;
    profissional: string;
    nascimento: string;
    cpf: string;
    rg: string;
    orgaoExpedidor: string;
    informacaoAdicionais: string;
    ChavePix: string;
    bancoId: string;
    agencia: string;
    conta: string;

    tipoConta: string;
    tipoPessoa: string;
    nomeConta: string;
    cpfConta: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    ativo: string;
    usuarioGrupo: string;
    usuarioId: string;
}

type TAtendenteComTotalCount = {
    data: IListagemAtendente[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TAtendenteComTotalCount | Error> => {
    try {
        const urlRelativa = `/v1/GetAtendentes?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;

        const { data, headers } = await Api().get(urlRelativa);

        if (data) {

            return {

                data,
                totalCount: Number((data[0].usuarioId) || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<IDetalheCliente | Error> => {
    try {
        const { data } = await Api().get(`v1/GetAtendenteId/${id}`);

        if (data) {
            //formatando data           
            data.nascimento = (moment(data.nascimento).format("DD/MM/YYYY"));
            
            return data;
        }

        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalheCliente, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api().post<IDetalheCliente>('v1/CreateCliente', dados);

        if (data) {
            return data.id;
        }

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: IDetalheCliente): Promise<void | Error> => {
    try {
        await Api().put(`v1/UpdateCliente/${id}`, dados);
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api().delete(`v1/DeleteCliente/${id}`);
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
};


export const AtendenteService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
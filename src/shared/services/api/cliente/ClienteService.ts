import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCliente {
    id: number;
    nome: string;
    apelido: string;
    email: string;
    celular: string;
    instagram: string;
    nascimento: Date;
    cpf: string;
    rg: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    observacao: string;
    ativo: string;
}

export interface IDetalheCliente {
    id: number;
    nome: string;
    apelido: string;
    email: string;
    celular: string;
    instagram: string;
    nascimento: Date;
    cpf: string;
    rg: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    observacao: string;
    ativo: string;
}

type TClienteComTotalCount = {
    data: IListagemCliente[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TClienteComTotalCount | Error> => {
    try {
        const urlRelativa = `/v1/GetClientes?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;

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
        const { data } = await Api().get(`v1/GetClienteId/${id}`);

        if (data) {
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


export const ClienteService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
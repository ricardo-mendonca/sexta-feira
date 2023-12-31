import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemBanco {
    id: number
    descricao: string;
    ativo: string;
}

export interface IDetalheBanco {
    id: number
    descricao: string;
    ativo: string;
}

type TbancoComTotalCount = {
  data: IListagemBanco[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TbancoComTotalCount | Error> => {
  try {
    const urlRelativa = `/v1/GetBancos?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;

    const { data, headers } = await Api().get(urlRelativa);

    if (data) {
      return {
        
        data,
        totalCount: Number((data[0].usuarioId)|| Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheBanco | Error> => {
  try {
    const { data } = await Api().get(`v1/GetBancoId/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheBanco, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<IDetalheBanco>('v1/CreateBanco', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheBanco): Promise<void | Error> => {
  try {
    await Api().put(`v1/UpdateBanco/${id}`, dados);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`v1/DeleteBanco/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const BancoService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
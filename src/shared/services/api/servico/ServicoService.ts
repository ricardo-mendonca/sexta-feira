import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemServico {
    id: number;
    nomeServico: string;
    descricaoServico: string;
    tempoServico: number;
    tempoHoraServico: number;
    precoServico: number;
    ativo: string;
    
}
export interface iDetalheServico {
    id: number;
    nomeServico: string;
    descricaoServico: string;
    ativo: string;
    tempoHoraServico: number;
    
    precoServico: number;
    
    
}
type TServicoComTotalCount = {
    data: IListagemServico[];
    totalCount: number;
  }

  
const getAll = async (page = 1, filter = ''): Promise<TServicoComTotalCount | Error> => {
    try {
      const urlRelativa = `/v1/GetServicos?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
  
      const { data, headers } = await Api().get(urlRelativa);
  
      if (data) {

        return {
            
          data,
          totalCount: Number((data[0].usuarioId)|| Environment.LIMITE_DE_LINHAS),
        };
      }
  
      return new Error('Erro ao listar os registros.');
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
  };

  const getById = async (id: number): Promise<iDetalheServico | Error> => {
    try {
      const { data } = await Api().get(`v1/GetServicoId/${id}`);
  
      if (data) {
        return data;
      }
  
      return new Error('Erro ao consultar o registro.');
    } catch (error) {
      return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
  };

  const create = async (dados: Omit<iDetalheServico, 'id'>): Promise<number | Error> => {
    try {
      console.log("Create1");
      console.log(dados);
      const { data } = await Api().post<iDetalheServico>('v1/CreateServico', dados);
      console.log("Create2");
      console.log(dados);
      if (data) {
        return data.id;
      }
  
      return new Error('Erro ao criar o registro.');
    } catch (error) {
      return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
  };

  const updateById = async (id: number, dados: iDetalheServico): Promise<void | Error> => {
    try {
      await Api().put(`v1/UpdateServico/${id}`, dados);
    } catch (error) {
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

  const deleteById = async (id: number): Promise<void | Error> => {
    try {
      await Api().delete(`v1/DeleteServico/${id}`);
    } catch (error) {
      return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
  };

  export const ServicoService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
  };
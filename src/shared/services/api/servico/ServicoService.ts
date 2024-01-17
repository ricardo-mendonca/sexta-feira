import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemServico {
    id: number;
    nomeServico: string;
    descricaoServico: string;
    tempoServico: string;
    tempoHoraServico: number;
    precoServico: number;
    ativo: string;
    usuarioId: number
}
export interface iDetalheServico {
    id: number;
    nomeServico: string;
    descricaoServico: string;
    tempoServico: string;
    tempoHoraServico: number;
    precoServico: number;
    ativo: boolean;
    usuarioId: number
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



  export const ServicoService = {
    getAll
    //create,
    //getById,
    //updateById,
    //deleteById,
  };
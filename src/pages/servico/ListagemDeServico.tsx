import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";


export const ListagemDeServico: React.FC = () => {
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();


    const handleSave = () => {
        console.log('Save');
      };
      
      const handleDelete = () => {
        console.log('Save');
      };

    return(

        <LayoutBaseDePagina
        titulo='Listagem de Serviços'
        barraDeFerramentas={
          <FerramentasDaListagem
            mostrarInputBusca
            //textoDaBusca={}
            textoBotaoNovo='Nova'
            aoClicarEmNovo={() => navigate('/servico/detalhe/nova')}
            //aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
          />
        }
      >

            <p>Detalhe de Serviços</p>


        </LayoutBaseDePagina>
    );
}
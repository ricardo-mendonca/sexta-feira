import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";


export const ListagemDeCliente: React.FC = () => {
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
        titulo='Listagem de Clientes'
        barraDeFerramentas={
          <FerramentasDaListagem
            mostrarInputBusca
            //textoDaBusca={}
            textoBotaoNovo='Nova'
            aoClicarEmNovo={() => navigate('/cliente/detalhe/nova')}
            //aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
          />
        }
      >

            <p>Detalhe de Cliente</p>


        </LayoutBaseDePagina>
    );
}
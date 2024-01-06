import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";


export const DetalheDeBanco: React.FC = () => {
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
            titulo="Detalhe de banco"
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                textoBotaoNovo="Novo"
                mostrarBotaoSalvarEFechar
                mostrarBotaoNovo={id !== 'novo'}
                mostrarBotaoApagar={id !== 'novo'}

                aoClicarEmSalvar={handleSave}
                aoClicarEmSalvarEFechar={handleSave}
                aoClicarEmApagar={handleDelete}
                aoClicarEmVoltar={() => navigate('/bancos')}
                aoClicarEmNovo={() => navigate('/bancos/detalhe/novo')}
                />
            }
        >

            <p>DetalheDeBanco</p>


        </LayoutBaseDePagina>
    );
}
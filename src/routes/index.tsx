import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDeBanco,DetalheDeBanco,  ListagemDeCliente,DetalheDeCliente,  ListagemDeServico,DetalheDeServico, ListagemDeAtendente,DetalheDeAtendente, 
         ListagemDeAtendimento,DetalheDeAtendimento, } from '../pages';


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'calendar_month',
        path: '/atendimento',
        label: 'Atendimentos',
      },
      {
        icon: 'location_city',
        path: '/servico',
        label: 'Serviços',
      },
      {
        icon: 'people',
        path: '/cliente',
        label: 'Clientes',
      },
      {
        icon: 'account_balance',
        path: '/bancos',
        label: 'Banco',
      },
      {
        icon: 'person',
        path: '/atendente',
        label: 'Atendentes',
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/servico" element={<ListagemDeServico />} />
      <Route path="/servico/detalhe/:id" element={<DetalheDeServico />} />
      
      <Route path="/bancos" element={<ListagemDeBanco />} />
      <Route path="/bancos/detalhe/:id" element={<DetalheDeBanco /> } />

      <Route path="/cliente" element={<ListagemDeCliente />} />
      <Route path="/cliente/detalhe/:id" element={<DetalheDeCliente /> } />

      <Route path="/atendente" element={<ListagemDeAtendente />} />
      <Route path="/atendente/detalhe/:id" element={<DetalheDeAtendente /> } />

      <Route path="/atendimento" element={<ListagemDeAtendimento/>} />
      <Route path="/atendimento/detalhe/:id" element={<DetalheDeAtendimento /> } />


      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};



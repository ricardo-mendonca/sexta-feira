import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Grid, LinearProgress, Paper, Switch, Typography } from "@mui/material";
import { ClienteService } from "../../shared/services/api/cliente/ClienteService";
import { VForm, VTextField, useVForm } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import moment from "moment";

interface IFormData {
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

export const DetalheDeCliente: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //#region Campos SET
    const { id = 'novo' } = useParams<'id'>();
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [instagram, setInstagram] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");
    const [observacao, setObservacao] = useState("");
    const [ativo, setAtivo] = useState(true);
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAtivo(event.target.checked);
    };
    //#endregion 

    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            ClienteService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                  
                    if (result instanceof Error) {
                        alert(" OPS!! algo deu errado \n" + result.message);
                        navigate("/cliente");
                    }
                    else {

                        setNome(result.nome);
                        setApelido(result.apelido);
                        setEmail(result.email);
                        setCelular(result.celular);
                        setInstagram(result.instagram);
                        setNascimento((moment(result.nascimento).format("YYYY-MM-DD")));
                        setCpf(result.cpf);
                        setRg(result.rg);
                        setEndereco(result.endereco);
                        setNumero(result.numero);
                        setComplemento(result.complemento);
                        setBairro(result.bairro);
                        setCidade(result.cidade);
                        setEstado(result.estado);
                        setCep(result.cep);
                        setObservacao(result.observacao);
                        setAtivo(result.ativo === '1' ? true : false);

                        formRef.current?.setData(result);
                    }
                });
        }
        else {
            setIsLoading(false);
            formRef.current?.setData({

                nome: '',
                apelido: '',
                email: '',
                celular: '',
                instagram: '',
                nascimento: '',
                cpf: '',
                rg: '',
                endereco: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                observacao: '',
                ativo: ''
            })
        }
    }, [formRef, id, navigate]);

    const handleSave = (dados: IFormData) => {
     
        //#region VALIDAÇÃO DE CAMPO
        var validacao = 0;
        if (dados.nome.length < 2) {
            formRef.current?.setFieldError('nome', 'O campo nome é obrigatorio, minimo de 3 caracteres!');
            setIsLoading(false);
            validacao = 1;
        }
        if (dados.apelido.length < 2) {
            formRef.current?.setFieldError('apelido', 'O campo apelido é obrigatorio, minimo de 3 caracteres!');
            setIsLoading(false);
            validacao = 1;
        }
        if (dados.celular.length < 2) {
            formRef.current?.setFieldError('celular', 'O campo Celular é obrigatorio!');
            setIsLoading(false);
            validacao = 1;
        }
        if (validacao != 0) {
            return;
        }
        //#endregion
       
        dados.ativo = (ativo === true ? '1' : '0');

        if (id === "novo") {
            ClienteService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/cliente');
                    } else {
                        navigate(`/cliente/detalhe/${result}`);
                    }
                }
            });
        }
        else {
            setIsLoading(true);

            dados.id = Number(id);
            ClienteService.updateById(Number(id), dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/cliente');
                    }
                }
            });
        }



    };

    const handleDelete = (id: number) => {
        if (
            window.confirm(
                "você tem certeza que quer apagar o registro " + id + " ?"
            )
        ) {
            ClienteService.deleteById(id).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert("Registro apagado com sucesso!");
                    navigate("/cliente");
                }
            });
        }
    };

    return (

        <LayoutBaseDePagina
            titulo="Detalhe de Cliente"
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Novo"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'novo'}
                    mostrarBotaoApagar={id !== 'novo'}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/cliente')}
                    aoClicarEmNovo={() => navigate('/cliente/detalhe/novo')}
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box
                    margin={1}
                    display="flex"
                    flexDirection="column"
                    component={Paper}
                    variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    name="nome"
                                    disabled={isLoading}
                                    label="Nome"
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    name="apelido"
                                    disabled={isLoading}
                                    label="Apelido"
                                    onChange={e => setApelido(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={5} lg={5} xl={5}>
                                <VTextField
                                    fullWidth
                                    name="celular"
                                    disabled={isLoading}
                                    label="Celular"
                                    onChange={e => setCelular(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={5} lg={5} xl={5}>
                                <VTextField
                                    fullWidth
                                    name="email"
                                    disabled={isLoading}
                                    label="E-mail"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <label>Cliente Ativo ? </label>
                                <Switch
                                    checked={ativo}
                                    onChange={handleChangeSwitch}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>


                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={5} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="instagram"
                                    disabled={isLoading}
                                    label="instagram"
                                    onChange={e => setInstagram(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={5} lg={3} xl={3}>
                                
                  
                                <VTextField
                                    fullWidth
                                   type="date"
                                    name="nascimento"
                                    disabled={isLoading}
                                    label="Data Nascimento"
                                    onChange={e => setNascimento(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={5} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="cpf"
                                    disabled={isLoading}
                                    label="CPF"
                                    onChange={e => setCpf(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={5} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="rg"
                                    disabled={isLoading}
                                    label="rg"
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Grid>

                        </Grid>


                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="cep"
                                    disabled={isLoading}
                                    label="CEP"
                                    onChange={e => setCep(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <VTextField
                                    fullWidth
                                    name="endereco"
                                    disabled={isLoading}
                                    label="endereco"
                                    onChange={e => setEndereco(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="numero"
                                    disabled={isLoading}
                                    label="Numero"
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <VTextField
                                    fullWidth
                                    name="complemento"
                                    disabled={isLoading}
                                    label="Complemento"
                                    onChange={e => setComplemento(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="bairro"
                                    disabled={isLoading}
                                    label="Bairro"
                                    onChange={e => setBairro(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <VTextField
                                    fullWidth
                                    name="cidade"
                                    disabled={isLoading}
                                    label="Cidade"
                                    onChange={e => setCidade(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="estado"
                                    disabled={isLoading}
                                    label="estado"
                                    onChange={e => setEstado(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <VTextField
                                    fullWidth
                                    name="observacao"
                                    disabled={isLoading}
                                    label="observacao"
                                    onChange={e => setObservacao(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {isLoading && (
                        <Grid item>
                            <LinearProgress variant="indeterminate"></LinearProgress>
                        </Grid>
                    )}

                </Box>
            </VForm>


        </LayoutBaseDePagina>
    );
}
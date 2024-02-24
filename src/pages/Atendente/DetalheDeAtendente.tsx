import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Divider, Grid, LinearProgress, Paper, Switch, Typography } from "@mui/material";
import { AtendenteService } from "../../shared/services/api/atendente/AtendenteService";
import { VForm, VTextField, useVForm } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import moment from "moment";

interface IFormData {
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
    digito: string;
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
  
}

export const DetalheDeAtendente: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //#region Campos SET
    const { id = 'novo' } = useParams<'id'>();
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const [nascimento, setNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
    const [informacaoAdicionais, setInformacaoAdicionais] = useState("");
    const [chavePix, setChavePix] = useState("");
    const [bancoId, setBancoId] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");
    const [digito, setDigito] = useState("");
    const [tipoConta, setTipoConta] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("");
    const [nomeConta, setNomeConta] = useState("");
    const [cpfConta, setCpfConta] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");
    const [ativo, setAtivo] = useState(true);
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAtivo(event.target.checked);
    };
    const [proprietario, setProprietario] = useState(true);
    const handleChangeProprietario = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProprietario(event.target.checked);
    };
    const [gerente, setGerente] = useState(true);
    const handleChangeGerente = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGerente(event.target.checked);
    };
    const [profissional, setProfissional] = useState(true);
    const handleChangeProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfissional(event.target.checked);
    };
    //#endregion 

    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            AtendenteService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(" OPS!! algo deu errado \n" + result.message);
                        navigate("/atendente");
                    }
                    else {
                        console.log("result")
                        console.log(result)

                        setNome(result.nome);
                        setApelido(result.apelido);
                        setEmail(result.email);
                        setTelefone(result.telefone);
                        setNascimento((moment(result.nascimento).format("YYYY-MM-DD")));
                        setCpf(result.cpf);
                        setRg(result.rg);
                        setOrgaoExpedidor(result.orgaoExpedidor);
                        setInformacaoAdicionais(result.informacaoAdicionais);
                        setChavePix(result.ChavePix);
                        setBancoId(result.bancoId.toString());
                        setAgencia(result.agencia);
                        setConta(result.conta);
                        setTipoConta(result.tipoConta);
                        setTipoPessoa(result.tipoPessoa);
                        setNomeConta(result.nomeConta);
                        setCpfConta(result.cpfConta);
                        setEndereco(result.endereco);
                        setNumero(result.numero);
                        setComplemento(result.complemento);
                        setBairro(result.bairro);
                        setCidade(result.cidade);
                        setEstado(result.estado);
                        setCep(result.cep);
                        setAtivo(result.ativo === '1' ? true : false);
                        setProprietario(result.proprietario === '1' ? true : false);
                        setGerente(result.gerente === '1' ? true : false);
                        setProfissional(result.profissional === '1' ? true : false);
                        
                        
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
                telefone: '',
                proprietario: '',
                gerente: '',
                profissional: '',
                nascimento: '',
                cpf: '',
                rg: '',
                orgaoExpedidor: '',
                informacaoAdicionais: '',
                ChavePix: '',
                bancoId: undefined,
                agencia: '',
                conta: '',
                digito: '',
                tipoConta: '',
                tipoPessoa: '',
                nomeConta: '',
                cpfConta: '',
                endereco: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
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
        if (!dados.nascimento) {
            formRef.current?.setFieldError('nascimento', 'O campo aniversario é obrigatorio, informe uma data valida!');
            setIsLoading(false);
            validacao = 1;
        }
        if (dados.email.length < 2) {
            formRef.current?.setFieldError('email', 'O campo aniversario é obrigatorio, informe uma data valida!');
            setIsLoading(false);
            validacao = 1;
        }
        if (validacao != 0) {
            return;
        }

        //#endregion

        dados.ativo = (ativo === true ? '1' : '0');
        dados.proprietario = (proprietario === true ? '1' : '0');
        dados.gerente = (gerente === true ? '1' : '0');
        dados.profissional = (profissional === true ? '1' : '0');
        
        //dados.nascimento = (moment(dados.nascimento).format("YYYY-MM-DD"));

        console.log("dados");
        console.log(dados);

        if (id === "novo") {
            AtendenteService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/atendente');
                    } else {
                        navigate(`/atendente/detalhe/${result}`);
                    }
                }
            });
        }
        else {
            setIsLoading(true);

            dados.id = Number(id);
            AtendenteService.updateById(Number(id), dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/atendente');
                    }
                }
            });
        }






        console.log('Save');






    };

    const handleDelete = (id: number) => {
        console.log('Save');
    };

    return (

        <LayoutBaseDePagina
            titulo="Detalhe de Atendente"
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Novo"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'novo'}
                    mostrarBotaoApagar={id !== 'novo'}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/atendente')}
                    aoClicarEmNovo={() => navigate('/atendente/detalhe/novo')}
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
                            <Grid item xs={12} sm={8} md={4} lg={3} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="telefone"
                                    disabled={isLoading}
                                    label="Celular"
                                    onChange={e => setTelefone(e.target.value)}
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
                                <label>Atendente Ativo ? </label>
                                <Switch
                                    checked={ativo}
                                    onChange={handleChangeSwitch}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>

                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <label>Proprietário ? </label>
                                <Switch
                                    checked={proprietario}
                                    onChange={handleChangeProprietario}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <label>Gerente ? </label>
                                <Switch
                                    checked={gerente}
                                    onChange={handleChangeGerente}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <label>Profissional ? </label>
                                <Switch
                                    checked={profissional}
                                    onChange={handleChangeProfissional}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    type="date"
                                    name="nascimento"
                                    disabled={isLoading}
                                    label="Aniversario"
                                    onChange={e => setNascimento(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="cpf"
                                    disabled={isLoading}
                                    label="CPF"
                                    onChange={e => setCpf(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="rg"
                                    disabled={isLoading}
                                    label="RG"
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="orgaoExpedidor"
                                    disabled={isLoading}
                                    label="Orgao Expedidor"
                                    onChange={e => setOrgaoExpedidor(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7} md={10} lg={10} xl={10}>
                                <VTextField
                                    fullWidth
                                    name="informacaoAdicionais"
                                    disabled={isLoading}
                                    label="Inf. Adicionais"
                                    onChange={e => setInformacaoAdicionais(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Divider textAlign="left">dados bancários</Divider>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <VTextField
                                    fullWidth
                                    name="chavePix"
                                    disabled={isLoading}
                                    label="Chave PIX"
                                    onChange={e => setChavePix(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="bancoId"
                                    disabled={isLoading}
                                    label="Banco"
                                    onChange={e => setBancoId(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="agencia"
                                    disabled={isLoading}
                                    label="Agência"
                                    onChange={e => setAgencia(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="conta"
                                    disabled={isLoading}
                                    label="Conta"
                                    onChange={e => setConta(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="tipoConta"
                                    disabled={isLoading}
                                    label="Tipo Conta"
                                    onChange={e => setTipoConta(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="tipoPessoa"
                                    disabled={isLoading}
                                    label="Tipo Pessoa"
                                    onChange={e => setTipoPessoa(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={9} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    name="cpfConta"
                                    disabled={isLoading}
                                    label="CPF / CNPJ da conta"
                                    onChange={e => setCpfConta(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
                                <VTextField
                                    fullWidth
                                    name="nomeConta"
                                    disabled={isLoading}
                                    label="Nome da Conta"
                                    onChange={e => setNomeConta(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Divider textAlign="left">endereço</Divider>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={9} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="cep"
                                    disabled={isLoading}
                                    label="CEP"
                                    onChange={e => setCep(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                <VTextField
                                    fullWidth
                                    name="endereco"
                                    disabled={isLoading}
                                    label="Endereço"
                                    onChange={e => setEndereco(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="numero"
                                    disabled={isLoading}
                                    label="Número"
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>

                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                <VTextField
                                    fullWidth
                                    name="bairro"
                                    disabled={isLoading}
                                    label="Bairro"
                                    onChange={e => setBairro(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                <VTextField
                                    fullWidth
                                    name="cidade"
                                    disabled={isLoading}
                                    label="Cidade"
                                    onChange={e => setCidade(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={2} lg={2} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="estado"
                                    disabled={isLoading}
                                    label="Estado"
                                    onChange={e => setEstado(e.target.value)}
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
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
function Home() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>Funcionalidades do Website</h1>
        <div style={{ marginLeft: '20px' }}>
            <li>
                <a href="/team" style={{ color: colors.grey[100], fontSize: '18px' }} >Tabela da Equipe</a>
                <ul>
                    <li>Tabela Geral com todos os Membros da Equipe.</li>
                    <li>Para adicionar um novo membro na Equipe é necessário fazer o Logout e ir para Registro de Usuário.</li>
                </ul>
            </li>
            <li>
                <a href="/equipments" style={{ color: colors.grey[100], fontSize: '18px' }} >Tabela de Equipamentos</a>
                <ul>
                    <li>Formulário para adicionar equipamento.</li>
                    <li>Importar Planilha para adicionar múltiplos equipamentos de uma só vez.</li>
                    <li>Opção para visualizar mais informações de um equipamento específico como: Informções Báscias, Ordem de Serviços e Calibrações.</li>
                    <li>Envia Email para o usuário que adicionou o equipamento.</li>
                    <li>Editar informações básicas do equipamento.</li>
                </ul>
            </li>
            <li>
                <a href="/orders" style={{ color: colors.grey[100], fontSize: '18px' }} >Tabela de Ordens de Serviços</a>
                <ul>
                    <li>Tabela Geral de Ordens de Serviços.</li>
                    <li>Botão para deletar Ordem de Serviços embutido na Taabela.</li>
                    <li>Formulario para criar Ordem de Serviços na pagina de visualizar informações adicionais do Equipamento.</li>
                </ul>
            </li>
            <li>
                <a href="/calibrations" style={{ color: colors.grey[100], fontSize: '18px' }} >Tabela de Calibrações</a>
                <ul>
                    <li>Tabela Geral de Ordens de Serviços e Calibrações.</li>
                    <li>Botões para gerar PDF com o conteúdo básico da calibração e para deletar calibração embutidos na Tabela.</li>
                </ul>
            </li>
            <h3> Informações adicionais:</h3>
            <ul>
                <li>Opção de mudar o tema da página para o modo escuro.</li>
                <li>Os Botões para acessar as Tabelas estão na barra lateral.</li>
                
            </ul>
        </div>
    </div>
    );
}

export default Home;

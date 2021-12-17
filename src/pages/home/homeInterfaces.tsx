export interface InviteProps{
  email?: string;
  nome: string;
  whatsapp?: string;
  telegram?: string;
  url_sessao: string;
}

export interface InviteState{
  linkSessao: string
}

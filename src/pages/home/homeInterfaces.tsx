export interface InviteProps{
  email: string;
  nome: string;
  whatsapp: string;
  telegram?: string;
}

export interface InviteState{
  linkSessao: string
}
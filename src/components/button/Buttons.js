import styled from 'styled-components'
import { SvgIcon } from './Icons'
import close from '../../assets/images/close'
import fb from '../../assets/images/fb'
import telegram from '../../assets/images/telegram'
import discord from '../../assets/images/discord'
import ticTok from '../../assets/images/tikTok'
import linkedin from '../../assets/images/linkedin'
import medium from '../../assets/images/medium'
import quora from '../../assets/images/quora'
// import youtube from '../../assets/images/youtube'
// import instagram from '../../assets/images/instagram'
// import twitter from '../../assets/images/twitter'

export const Button = styled.button`
  padding: ${props => props.theme.spacing(1.5, 3)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  color: ${props => props.theme.palette.text.corporate};
  border-radius: ${props => props.theme.shape.borderRadius()};
  background: ${props => props.theme.palette.background.linearGradient};
  text-transform: uppercase;
`

export const SvgIconButton = ({
  path, svgTitle, svgId, w, h, fill, isScale,
  children,
  pd,
  ...args
}) => {
  const svgArgs = { path, svgTitle, svgId, w, h, fill, isScale }
  return (
    <IButton {...args} pd={pd} lb={children}>
      <SvgIcon {...svgArgs} />
      { children && <span>{ children }</span> }
    </IButton>
  )
}

const IButton = styled.button`
  display: inline-flex;
  font-size: inherit;
  padding: ${props => props.pd ? `${props.pd}px` : '0'};
  color: ${props => props.theme.palette.text.corporate};
  border-radius: ${props => {
    return props.lb
      ? props.theme.shape.borderRadius()
      : '50%'
  }};
  overflow: hidden;
  @media (pointer: fine) {
    &:hover {
      opacity: 0.95;
      background-color: ${props => props.theme.hexToRGBa(props.theme.palette.background.secondary, 0.5)};
      color: ${props => props.theme.palette.text.main};
    }
  }
  & > span {
    display: inline-flex;
    align-items: center;
    margin-left: ${props => {
      return props.lb
        ? props.theme.spacing(1)
        : '0'
    }};
  }
  & > svg {
    transition: opacity 0.3s, fill 0.3s;
    @media (pointer: fine) {
      &:hover {
        opacity: 0.95;
      }
    }
  }
`

// export const YoutubeIconButton = ({ ...args }) => <SvgIconButton {...args} w='40' h='40' path={youtube} />
// export const InstagramIconButton = ({ ...args }) => <SvgIconButton {...args} w='40' h='40' path={instagram} />
// export const TwitterIconButton = ({ ...args }) => <SvgIconButton {...args} w='40' h='40' path={twitter} />

export const CloseIconButton = ({ ...args }) => <SvgIconButton {...args} w='15' h='15' pd='6' path={close} />
export const FbIconButton = ({ ...args }) => <FooterIconButton {...args} w='20' h='20' pd='10' path={fb} />
export const TelegramIconButton = ({ ...args }) => <FooterIconButton {...args} w='20' h='20' pd='10' path={telegram} />
export const DiscordIconButton = ({ ...args }) => <FooterIconButton {...args} w='24' h='24' pd='8' path={discord} />
export const TicTokIconButton = ({ ...args }) => <FooterIconButton {...args} w='20' h='20' pd='10' path={ticTok} />
export const LinkedinIconButton = ({ ...args }) => <FooterIconButton {...args} w='20' h='20' pd='10' path={linkedin} />
export const MediumIconButton = ({ ...args }) => <FooterIconButton {...args} w='24' h='24' pd='8' path={medium} />
export const QuoraIconButton = ({ ...args }) => <FooterIconButton {...args} w='20' h='20' pd='10' path={quora} />

const FooterIconButton = styled(SvgIconButton)`
  background-color: ${props => props.theme.palette.background.secondary};
`

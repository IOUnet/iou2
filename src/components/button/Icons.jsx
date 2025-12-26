import styled from 'styled-components'
import * as hooks from '../../hooks'
import flagFinish from '../../assets/images/flagFinish'
import calendar from '../../assets/images/calendar'
import externalLink from '../../assets/images/externalLink'
import addToList from '../../assets/images/addToList'
import error from '../../assets/images/error'
import ethereumIcon from '../../assets/images/ethereumIcon'

export const SvgIcon = ({
  path,
  svgTitle,
  svgId,
  w = '16',
  h = '16',
  fill = 'none',
  isScale = true,
  className,
  ...attrs
 }) => {
  const { svgRef, transform } = hooks.useSvgTransform(w, h, isScale)

  return (
    <ISvgIcon
      className={className}
      width={w}
      height={h}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={svgTitle}
      {...attrs}
    >
      <SvgBody ref={svgRef} transform={transform}>
        { svgTitle && <title id={svgId}>{svgTitle}</title>}
        { path }
      </SvgBody>
    </ISvgIcon>
  );
}

const ISvgIcon = styled.svg`
  color: inherit;
`
const SvgBody = styled.g`
  visibility: ${props => props.transform ? 'unset' : 'hidden'};
  & {
    fill: currentColor;
  }
`

export const ImgIcon = ({
  src,
  alt = 'img',
  as = 'span',
  w,
  h,
  pd,
  rd,
  sc = false,
  ...args
 }) => {
  const { imgRef, scale } = hooks.useImgScale(w, h, sc)

  return (
    <ImageContainer {...args} as={as} w={w} h={h} pd={pd}>
      <IImgIcon
        ref={imgRef}
        src={src}
        alt={alt}
        w={w}
        h={h}
        pd={pd}
        rd={rd}
        s={scale}
      />
    </ImageContainer>
  );
}

const ImageContainer = styled.span`
  display: ${props => props.as === 'span' ? 'inline-flex' : 'flex'};
  width: ${props => props.w ? `${props.w}px` : 'unset'};
  height: ${props => props.h ? `${props.h}px` : 'unset'};
  padding: ${props => props.pd ? `${props.pd}px` : '0'};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const IImgIcon = styled.img`
  width: ${props => (props.s === 'none')
    ? 'unset'
    : (props.s === 'w')
      ? `${props.pd ? props.w - 2 * props.pd : props.w}px`
      : 'auto'
  };
  height: ${props => (props.s === 'none')
    ? 'unset'
    : (props.s === 'h')
      ? `${props.pd ? props.h - 2 * props.pd : props.h}px`
      : 'auto'
  };
  border-radius: ${props => props.rd
    ? (typeof props.rd === 'string') ? props.rd : `${props.rd}px`
    : 'unset'
  };
  visibility: ${props => props.s ? 'unset' : 'hidden'};
  line-height: 0;
  font-size: 0;
`

export const TokenImgIcon = styled(ImgIcon)`
  border-radius: 50%;
  background-color: ${props => props.theme.palette.background.secondary};
  box-shadow: ${props => props.theme.shadows[1]};
`

export const CoinIcon = ({
  src, w = '36', h = '36', pd = '8', sc = true, ...args
}) => <TokenImgIcon {...args} src={src} w={w} h={h} pd={pd} sc={sc} />

export const EthereumIcon = ({ ...args }) => <SvgIcon {...args} w='24' h='24' path={ethereumIcon} />
export const AddToListIcon = ({ ...args }) => <SvgIcon {...args} w='24' h='24' path={addToList} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
export const ExternalLinkIcon = ({ ...args }) => <SvgIcon {...args} w='24' h='24' path={externalLink} />
export const FlagFinishIcon = ({ ...args }) => <SvgIcon {...args} w='16' h='16' path={flagFinish} />
export const CalendarIcon = ({ ...args }) => <SvgIcon {...args} w='16' h='16' path={calendar} />
export const WarningIcon = ({ ...args }) => <SvgIcon {...args} w='16' h='16' path={error} />

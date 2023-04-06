import styled from 'styled-components';
import { ContainerProps } from './container.component';

export const ContainerStyle = styled.div<ContainerProps>`
  display: flex;
  width: ${(props: ContainerProps) => props.width || '100%'};
  height: ${(props: ContainerProps) => props.height || '100%'};
  padding: ${(props: ContainerProps) => props.padding || '0'};
  justify-content: ${(props: ContainerProps) => props.justify || 'center'};
  align-items: ${(props: ContainerProps) => props.align || 'center'};
  flex-direction: ${(props: ContainerProps) => props.direction || 'column'};
  background-color: ${(props: ContainerProps) =>
    props.backgroundColor || 'transparent'};
  border-radius: 8px;
  gap: ${(props: ContainerProps) => props.gap || '0'};
  border: ${(props: ContainerProps) => props.border || 'none'};
  overflow: ${(props: ContainerProps) => props.overflow || 'none'};
  max-width: 500px;
  flex-wrap: ${(props: ContainerProps) =>
    props.direction === 'row' ? 'wrap' : 'nowrap'};
`;

import styled from 'styled-components';
import { Image as CrystallizeImage } from '@crystallize/react-image';
import ContentTransformer from 'ui/content-transformer';
import { responsive } from 'ui';

const Img = styled.div`
  figure {
    height: 100%;
  }
  img {
    width: 100%;
    object-fit: cover;
  }

  ${responsive.smPlus} {
    max-width: 50%;
  }
  ${responsive.mdPlus} {
    max-width: 60%;
  }
`;
const Description = styled.div`
  p,
  li {
    font-size: var(--font-size-body);
    line-height: 1.8em;
  }
`;
const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: 15px;
`;
const Button = styled.a`
  padding: 10px 15px;
  display: inline-block;
  margin-top: 15px;
  font-size: var(--font-size-s);
  font-weight: 600;
  border-radius: 4px;
  color: #fff;
  background: #000;
`;

const Content = styled.div`
  align-items: center;
  color: var(--font-color-main);
  display: flex;
  height: 100%;

  ${responsive.smPlus} {
    max-width: var(--font-max-width);
  }
`;

const Outer = styled.div`
  position: relative;
  border: 4px solid transparent;
  border: 1px solid #dfdfdf;
  margin-top: 15px;
  display: flex;
  margin-bottom: 100px; // @todo: move this responsalibity to the layout
  margin-top: 15px; // @todo: move this responsalibity to the layout
  position: relative;
  flex-direction: column;

  ${responsive.smPlus} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
  }

  // For small resolutions -> vertical (child1 / child2)
  //   They are displayed one above the other one.
  // For Tablet and wider resolutions -> horizontal (child1 - child2)
  //   They are displayed one next to each other with a gap between them.
  //
  .banner-content,
  .banner-media {
    padding: 2em;
    ${responsive.smPlus} {
      padding: 0;
    }
  }
  .banner-content {
    ${responsive.smPlus} {
      padding: 5em 50px;
      flex-direction: row;
      margin-right: 30px;
    }
  }
  .banner-media {
    padding: 2em;
    ${responsive.smPlus} {
      padding: 0;
    }
  }

  &.banner--withOverlay {
    display: block;
    padding: 0;
    position: relative;

    .banner-content {
      padding: 1.5em;
      min-height: 350px;

      ${responsive.smPlus} {
        padding: 0 5em;
        margin-right: 0;
      }

      ${responsive.mdPlus} {
        min-height: 600px;
      }

      ${responsive.lg} {
        min-height: 700px;
      }
      ${responsive.xl} {
        min-height: 800px;
      }

      p,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: #fff;
      }
    }

    .banner-media {
      bottom: 0;
      content: '';
      left: 0;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;

      :after {
        background: linear-gradient(
          -90deg,
          rgba(8, 7, 8, 0) 0%,
          rgba(8, 7, 8, 0.6) 100%
        );
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      img {
        position: relative;
        height: 100%;
      }
    }

    .banner-button {
      color: #000;
      background: #fff;
    }

    .banner-media {
      max-width: 100%;
    }
  }
`;

function Banner({
  title,
  description,
  link,
  linkText,
  image,
  addTextAsOverlay
}) {
  return (
    <Outer className={addTextAsOverlay ? 'banner--withOverlay' : ''}>
      <Content className="banner-content">
        <div>
          {!!title && <Title>{title}</Title>}
          {!!description && (
            <Description>
              <ContentTransformer json={description} />
            </Description>
          )}
          {!!link && (
            <Button className="banner-button" href={link}>
              {linkText}
            </Button>
          )}
        </div>
      </Content>
      <Img className="banner-media">
        <CrystallizeImage
          {...image?.[0]}
          sizes="(max-width: 700px) 100vw, 1200px"
        />
      </Img>
    </Outer>
  );
}

export default Banner;

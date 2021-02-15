import ItemCollection from 'components/item-collection';
import GridCollection from 'components/grid-collection';
import Banner from 'components/banner';

const StackRenderer = ({ stack }) => {
  switch (stack?.shape?.name) {
    case 'Item collection': {
      const title = stack?.components?.find(isTitleComponent)?.content?.text;
      const description = stack?.components?.find(isDescriptionComponent)
        ?.content?.json;
      const items = stack?.components?.find((c) => c.name === 'Items')?.content
        ?.items;

      return (
        <ItemCollection title={title} description={description} items={items} />
      );
    }

    case 'Grid collection': {
      const title = stack?.components?.find(isTitleComponent)?.content?.text;
      const description = stack?.components?.find(isDescriptionComponent)
        ?.content?.json;
      const grids = stack?.components?.find(isGridComponent)?.content?.grids;

      return (
        <GridCollection title={title} description={description} grids={grids} />
      );
    }

    case 'Collection': {
      const title = stack?.components?.find(isTitleComponent)?.content?.text;
      const description = stack?.components?.find(isDescriptionComponent)
        ?.content?.json;
      const choice = stack?.components?.find(isChoiceComponent)?.content
        ?.selectedComponent;
      if (choice?.name === 'Grid') {
        const grids = choice.content?.grids;
        return (
          <GridCollection
            title={title}
            description={description}
            grids={grids}
          />
        );
      }
      if (choice?.name === 'Items') {
        const items = choice.content?.items;
        return (
          <ItemCollection
            title={title}
            description={description}
            items={items}
          />
        );
      }
      return <div>No choice has been made</div>;
    }

    case 'Banner': {
      const title = stack?.components?.find(isTitleComponent)?.content?.text;
      const description = stack?.components?.find(isDescriptionComponent)
        ?.content?.json;
      const linkText = stack?.components?.find(isLinkTextComponent)?.content
        ?.text;
      const link = stack?.components?.find(isLinkComponent)?.content?.text;
      const image = stack?.components?.find(isImageComponent)?.content?.images;
      const addTextAsOverlay = stack?.components?.find(
        isAddTextAsOverlayComponent
      )?.content?.value;

      return (
        <Banner
          title={title}
          description={description}
          linkText={linkText}
          link={link}
          image={image}
          addTextAsOverlay={addTextAsOverlay}
        />
      );
    }

    default:
      return <div>Stack type not supported</div>;
  }
};

const Stackable = ({ stacks }) => {
  return (
    <>
      {stacks?.map((stack) => (
        <StackRenderer stack={stack} key={stack?.id} />
      ))}
    </>
  );
};

export default Stackable;

function isTitleComponent({ name }) {
  return name === 'Title';
}

function isDescriptionComponent({ name }) {
  return name === 'Description';
}

function isGridComponent({ name }) {
  return name === 'Grid';
}
function isChoiceComponent({ name }) {
  return name === 'Content';
}

function isLinkTextComponent({ name }) {
  return name === 'Link text';
}

function isLinkComponent({ name }) {
  return name === 'Link';
}

function isImageComponent({ name }) {
  return name === 'Image';
}

function isAddTextAsOverlayComponent({ name }) {
  return name === 'Add text as overlay';
}

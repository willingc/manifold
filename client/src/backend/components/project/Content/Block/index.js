import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import Current from "./in-list/Current";
import Available from "./in-list/Available";
import AvailablePlaceholder from "./in-list/AvailablePlaceholder";
import typeResolver from "../helpers/resolver";
import isFunction from "lodash/isFunction";

export default class ProjectContentBlock extends PureComponent {
  static displayName = "Project.Content.Blocks.Block";

  static propTypes = {
    currentBlocks: PropTypes.array.isRequired,
    index: PropTypes.number,
    entity: PropTypes.object,
    context: PropTypes.oneOf(["available", "current"]),
    disabled: PropTypes.func,
    onClickAdd: PropTypes.func
  };

  static defaultProps = {
    blocks: [],
    placed: false,
    available: true,
    disabled: () => false
  };

  get listContext() {
    return this.props.context;
  }

  get inAvailableList() {
    return this.listContext === "available";
  }

  get inCurrentList() {
    return this.listContext === "current";
  }

  get index() {
    return this.props.index;
  }

  get id() {
    if (!this.props.entity) return null;
    return this.props.entity.id;
  }

  get orderable() {
    if (!this.props.entity) return null;
    return !this.props.entity.attributes.orderable;
  }

  get type() {
    return this.props.type;
  }

  get draggableId() {
    if (this.inAvailableList) return typeResolver.typeToAvailableId(this.type);
    return typeResolver.typeToCurrentId(this.id);
  }

  get disabled() {
    if (this.inCurrentList) return this.orderable;
    if (!isFunction(this.typeComponent.isAvailable)) return false;
    return !this.typeComponent.isAvailable(this.props.currentBlocks);
  }

  get typeComponent() {
    return typeResolver.typeToBlockComponent(this.type);
  }

  handleClickAdd = () => {
    this.props.onClickAdd(this.type);
  };

  render() {
    const TypeComponent = this.typeComponent;
    const ListContextBlock = this.inAvailableList ? Available : Current;
    const baseClass = "content-block";

    if (this.disabled) return (
      <div
        className={classNames(
          baseClass,
          `${baseClass}--${this.props.context} ${baseClass}--inactive`
        )}
      >
        <ListContextBlock
          entity={this.props.entity}
          entityCallbacks={this.props.entityCallbacks}
          typeComponent={TypeComponent}
          onClickAdd={this.handleClickAdd}
          disabled={this.disabled}
        />
      </div>
    );

    return (
      <Draggable
        isDragDisabled={this.disabled}
        draggableId={this.draggableId}
        foo="bar"
        index={this.index}
      >
        {(provided, snapshot) => {
          return (
            <React.Fragment>
              <div
                {...provided.draggableProps}
                ref={provided.innerRef}
                style={provided.draggableProps.style}
                className={classNames(
                  baseClass,
                  `${baseClass}--${this.props.context}`, {
                    [`${baseClass}--active`]: !this.disabled,
                    [`${baseClass}--inactive`]: this.disabled,
                    [`${baseClass}--is-dragging`]: snapshot.isDragging
                  }
                )}
              >
                <ListContextBlock
                  entity={this.props.entity}
                  entityCallbacks={this.props.entityCallbacks}
                  dragHandleProps={provided.dragHandleProps}
                  typeComponent={TypeComponent}
                  onClickAdd={this.handleClickAdd}
                  disabled={this.disabled}
                />
              </div>
              {this.inAvailableList && snapshot.isDragging && (
                <div className={classNames(
                  baseClass,
                  `${baseClass}--${this.props.context}`,
                  `${baseClass}--inactive`
                )}>
                  <AvailablePlaceholder typeComponent={TypeComponent} />
                </div>
              )}
              {this.inCurrentList && provided.placeholder}
            </React.Fragment>
          );
        }}
      </Draggable>
    );
  }
}
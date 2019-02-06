import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Wrapper from "../parts/Wrapper";
import Heading from "../parts/Heading";
import TextList from "frontend/components/TextList";
import pick from "lodash/pick";

export default class ProjectContentBlockTextsBlock extends PureComponent {
  static displayName = "Project.Content.Block.Texts";

  static propTypes = {
    block: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
  };

  get title() {
    return this.props.block.attributes.title || "Texts";
  }

  get icon() {
    return "bookStackIsometric";
  }

  get texts() {
    return this.props.project.relationships.texts;
  }

  get includedCategories() {
    return this.props.block.relationships.includedCategories;
  }

  get projectCategories() {
    return this.props.project.relationships.textCategories;
  }

  get categories() {
    if (this.includedCategories.length > 0) return this.includedCategories;
    return this.projectCategories;
  }

  get blockDescription() {
    return this.props.block.attributes.descriptionFormatted;
  }

  get uncategorizedTexts() {
    return this.texts.filter(text => text.relationships.category === null);
  }

  get visibility() {
    return pick(this.props.block.attributes, [
      "showAuthors",
      "showCategoryLabels",
      "showCovers",
      "showDates",
      "showDescriptions",
      "showSubtitles",
      "showUncategorized"
    ]);
  }

  textsForCategory(category) {
    return this.texts.filter(text => text.relationships.category === category);
  }

  render() {
    const baseClass = "entity-section-wrapper";

    return (
      <Wrapper>
        <Heading
          title={this.title}
          icon={this.icon}
          description={this.blockDescription}
        />
        <div className={`${baseClass}__body`}>
          <div className="text-list">
            {this.categories.map(category => (
              <TextList
                label={
                  this.visibility.showCategoryLabels
                    ? category.attributes.title
                    : null
                }
                texts={this.textsForCategory(category)}
                key={category.id}
                {...this.visibility}
              />
            ))}
            {this.visibility.showUncategorized && (
              <TextList
                label="Uncategorized"
                texts={this.uncategorizedTexts}
                {...this.visibility}
              />
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}
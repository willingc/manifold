module Updaters
  # Updates a ContentBlock model from JSON-API style params
  class ContentBlock
    include ::Updaters

    set_callback :update_relationships, :before, :adjust_reference_associations!

    delegate :content_block_references, to: :@model
    delegate :reference_configurations, to: :@model
    delegate :reference_configuration, to: :@model
    delegate :reference_associations, to: :@model

    private

    # rubocop:disable Metrics/AbcSize
    def update_relationships!(_model)
      clone = relationships.clone.with_indifferent_access

      relationships = reference_associations.map do |kind, _records|
        association = clone.delete kind
        next current_references(kind) if association.nil?
        configuration = reference_configuration(kind)
        next unless configuration.present?

        build_association_references association,
                                     kind,
                                     configuration.source
      end.flatten

      assign_association! relationships.reject(&:nil?)
    end
    # rubocop:enable Metrics/AbcSize

    def assign_association!(relationships)
      @model.content_block_references = relationships
    end

    def build_association_references(association, kind, source)
      return if association.blank?
      data = association.dig("data")

      if data.is_a? Array
        data.map do |attr|
          build_content_block_reference kind, attr["id"], source
        end
      else
        build_content_block_reference kind, data["id"], source
      end
    end

    def build_content_block_reference(kind, id, type)
      content_block_references.find_or_initialize_by kind: kind,
                                                     referencable_id: id,
                                                     referencable_type: type
    end

    def current_references(kind)
      @model.content_block_references.where(kind: kind)
    end
  end
end

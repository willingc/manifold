class VersionSerializer < ApplicationSerializer
  attributes :item_type, :item_id, :object_changes, :item_display_name,
             :event, :actor_name, :actor_id, :created_at, :deleted

  belongs_to :parent_item

  # Strip out lateral, nil-nil changes and updated_at
  def object_changes
    object.object_changes.except("updated_at")
  end

  def actor_name
    object.actor.name
  end

  def actor_id
    object.actor.id
  end

  # rubocop:disable Metrics/AbcSize
  def item_display_name
    return object.item_title_formatted if object.item.respond_to? :title_formatted
    return object.item_title if object.item.respond_to? :title

    object.object["title"] || object.item_id
  end
  # rubocop:enable Metrics/AbcSize

  def deleted
    object.item.nil?
  end
end

#
# Helpers for testing json schemas.
#
# The most basic usage is
#
# expect(some_string).to match_schema('types/foo.yml')
#
# where the argument to match_schema corresponds to a file in schemas/
#
#
# This can be chained with two helpers
# - `as_list`: validates an array, with the schema being for individual array elements
# - 'fragment': validates the data against a fragment with the schema. For example if the user schema had a fragment for an address you might right
#  expect(data).to match_schema('types/users.yml').fragment('#/definitions/address'
#
RSpec::Matchers.define :match_schema do |schema_or_key|

  match do |actual|
    JSON::Validator.validate(to_key(schema_or_key), actual, list: @as_list, fragment: @fragment)
  end

  chain :as_list do
    @as_list = true
  end

  failure_message do |actual|
    JSON::Validator.fully_validate(to_key(schema_or_key), actual, list: @as_list, fragment: @fragment, errors_as_objects: true).map do |error|
      format_message(error)
    end.join("\n")
  end

  chain :fragment do |value|
    @fragment = value
  end

  def to_key schema_or_key
    if schema_or_key.is_a?( String) && schema_or_key !~ %r{://}
      Schema.key(schema_or_key)
    else
      schema_or_key
    end
  end

  def spaces indent
    ' ' * indent
  end

  def format_message error, indent=0
    if error[:failed_attribute] == 'AnyOf' || error[:failed_attribute] == 'AllOf'
      error[:errors].map do |key, errors|
        "#{spaces(indent)}#{key}\n" + errors.map {|inner_error| format_message inner_error, indent+1}.join("\n")
      end
    else
      spaces(indent) + error[:message]
    end
  end
end

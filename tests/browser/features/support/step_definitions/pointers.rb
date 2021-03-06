When(/^I click on revision (\d+) to move the lower pointer$/) do |index|
  on(DiffPage).click_revision_lower(index.to_i)
end

When(/^I click on revision (\d+) to move the upper pointer$/) do |index|
  on(DiffPage).click_revision_upper(index.to_i)
end

When(/^I click on the older edit link$/) do
  on(DiffPage).click_older_edit_link
end

When(/^I click on the newer edit link$/) do
  on(DiffPage).click_newer_edit_link
end

Given(/^I drag the lower pointer to revision (\d+)$/) do |index|
  on(DiffPage) do |page|
    page.revisionslider_pointer_lower_element.element.drag_and_drop_on page.revisionslider_rev(index.to_i).element
  end
end

Given(/^I drag the upper pointer to revision (\d+)$/) do |index|
  on(DiffPage) do |page|
    page.revisionslider_pointer_upper_element.element.drag_and_drop_on page.revisionslider_rev(index.to_i).element
  end
end

Given(/^the diff has loaded$/) do
  on(DiffPage).wait_for_diff_to_load
end

When(/^I wait until the diff has loaded$/) do
  step 'the diff has loaded'
end

When(/^I wait until the pointers stopped moving$/) do
  on(DiffPage).wait_for_animations
end

Then(/^revision (\d+) should be loaded on the left of the diff$/) do |index|
  expect(on(DiffPage).revisionslider_left_summary_element.text).to include 'RS-Summary-' + index.to_s
end

Then(/^revision (\d+) should be loaded on the right of the diff$/) do |index|
  expect(on(DiffPage).revisionslider_right_summary_element.text).to include 'RS-Summary-' + index.to_s
end

Then(/^the upper pointer should be on revision (\d+)$/) do |index|
  expect(on(DiffPage).revisionslider_pointer_upper_element.attribute('data-pos')).to eq index
end

Then(/^the lower pointer should be on revision (\d+)$/) do |index|
  expect(on(DiffPage).revisionslider_pointer_lower_element.attribute('data-pos')).to eq index
end

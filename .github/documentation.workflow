workflow "New workflow" {
  on = "pull_request"
  resolves = ["GitHub Action for Slack"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "label documentation"
}

action "GitHub Action for Slack" {
  uses = "Ilshidur/action-slack@5b3a58f5e0ff655ca9c17a22516efdf9d0de36bf"
  needs = ["Filters for GitHub Actions"]
  args = "Workflow was triggered"
  secrets = ["SLACK_WEBHOOK"]
}

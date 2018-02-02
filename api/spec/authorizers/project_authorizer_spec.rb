require 'rails_helper'

RSpec.describe ProjectAuthorizer, :authorizer do
  let(:user) { FactoryBot.create(:user) }
  let(:admin) { FactoryBot.create(:user, role: Role::ROLE_ADMIN) }

  describe 'class authorization' do
    context 'when creating' do
      it 'is true for admin' do
        expect(ProjectAuthorizer).to be_creatable_by(admin)
      end

      it 'is false for user' do
        expect(ProjectAuthorizer).to_not be_creatable_by(user)
      end
    end

    context 'when updating' do
      it 'is true for admin' do
        expect(ProjectAuthorizer).to be_updatable_by(admin)
      end

      it 'is false for user' do
        expect(ProjectAuthorizer).to_not be_updatable_by(user)
      end
    end

    context 'when deleting' do
      it 'is true for admin' do
        expect(ProjectAuthorizer).to be_deletable_by(admin)
      end

      it 'is false for user' do
        expect(ProjectAuthorizer).to_not be_deletable_by(user)
      end
    end
  end

  describe 'instance authorization' do
    let(:project_resource) { FactoryBot.create(:project, draft: true) }

    context 'when reading' do
      context 'when draft' do
        it 'is true for admin' do
          expect(project_resource).to be_readable_by(admin)
        end

        it 'is false for user' do
          expect(project_resource).to_not be_readable_by(user)
        end
      end
    end
  end
end
